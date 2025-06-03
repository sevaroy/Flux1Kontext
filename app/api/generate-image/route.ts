import Replicate from 'replicate';

// Helper function to upload image to Cloudflare Images
async function uploadToCloudflareImages(
  imageUrl: string,
  accountId: string,
  apiToken: string
): Promise<string> {
  try {
    // Fetch the image from Replicate
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`);
    }

    const imageBytes = await imageResponse.arrayBuffer();

    // Create form data for upload
    const formData = new FormData();
    formData.append('file', new File([imageBytes], 'generated-image.jpg', { type: 'image/jpeg' }));

    // Upload to Cloudflare Images
    const uploadResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Cloudflare Images upload failed: ${uploadResponse.status} - ${errorText}`);
    }

    const uploadResult = await uploadResponse.json() as any;

    if (!uploadResult.success) {
      throw new Error(`Cloudflare Images upload failed: ${JSON.stringify(uploadResult.errors)}`);
    }

    // Return the delivery URL for the uploaded image
    return uploadResult.result.variants[0]; // Get the first variant URL
  } catch (error: unknown) {
    console.error('Error uploading to Cloudflare Images:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
    const model = 'black-forest-labs/flux-kontext-pro';

    const { prompt, input_image } = await request.json();

    // Generate image with Replicate
    const output = await replicate.run(model, {
      input: {
        prompt,
        input_image,
      },
    });

    const replicateImageUrl = output as unknown as string;

    // Upload to Cloudflare Images for permanent storage
    const cloudflareImageUrl = await uploadToCloudflareImages(
      replicateImageUrl,
      process.env.CLOUDFLARE_ACCOUNT_ID!,
      process.env.CLOUDFLARE_IMAGES_API_TOKEN!
    );

    // Return the Cloudflare Images URL instead of the temporary Replicate URL
    return Response.json({ imageUrl: cloudflareImageUrl });
  } catch (error: unknown) {
    console.error('Error in generate-image:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
