import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(request: Request) {
  try {
    const { prompt, input_image } = await request.json();
    const input = {
      // prompt: "makr the clothes green",
      // input_image: "https://replicate.delivery/pbxt/N80imNlQyx97uUkw8JBXWf6cXYkBCKSiopZaFWH1P3Vd6KjA/head.png",
      prompt,
      input_image,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      safety_tolerance: 2
    };

    const output: any = await replicate.run("black-forest-labs/flux-kontext-pro", { input });
    const replicateImageUrl = output.url()

    return Response.json({ imageUrl: replicateImageUrl });
  } catch (error: unknown) {
    console.error('Error in generate-image:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
