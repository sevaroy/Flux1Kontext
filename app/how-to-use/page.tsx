import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How to Use Flux Kontext Smart Image Editor - AI Conversational Image Editing Guide",
  description:
    "Learn in detail how to use Flux Kontext Smart Image Editor: upload images, edit them by conversing with the AI model, and easily download your creative results.",
  keywords:
    "Flux Kontext usage tutorial, AI image editing guide, conversational image editing, how to edit photos, AI image processing steps",
  alternates: {
    canonical: "https://fluxkontext.tech/how-to-use/",
  },
};

export default function HowToUsePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            How to Use Flux Kontext Smart Image Editor
          </h1>
          <p className="text-center mb-8 text-gray-600">
            Flux Kontext Smart Image Editor offers you a new way to edit images:
            through conversation with AI. Here are the simple steps to use it:
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">
                Step One: Upload Your Image
              </h2>
              <p className="text-gray-700 mb-4">
                Click the "Upload Image" button on the page, or drag and drop
                your image file into the designated area. We support various
                common image formats.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
                Tip: Ensure the image you upload is clear and meets your editing
                needs.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">
                Step Two: Converse with AI
              </h2>
              <p className="text-gray-700 mb-4">
                After uploading the image, you will enter the chat interface. In
                the chatbox, clearly describe the edits you want to make to the
                image. For example: "Please blur the background." "Change the
                red car in the picture to blue." "Add a pair of sunglasses to
                this person."
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
                Tip: The more specific your description, the more accurately AI
                can understand your intent. You can try different ways of
                phrasing.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">
                Step Three: Preview and Download the Edited Image
              </h2>
              <p className="text-gray-700 mb-4">
                After the AI model has finished processing, you will see a
                preview of the edited image. If you are satisfied, click the
                download button to save the image. If you need further
                modifications, you can continue conversing with AI and provide
                new editing instructions.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
                Tip: All images obtained through Flux Kontext Smart Image Editor
                can be used for commercial purposes.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">
                Advanced Conversation Tips
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Try sequential instructions, e.g., "First remove the
                  background, then place the person on the beach."
                </li>
                <li>
                  Correct AI's understanding, e.g., "No, I meant the person on
                  the right."
                </li>
                <li>
                  Explore different styles of editing requests, e.g., "Make this
                  photo look like an oil painting."
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
