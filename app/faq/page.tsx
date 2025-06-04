export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Flux Kontext Smart Image Editor: FAQ - AI Conversational Image Editing",
  description:
    "Frequently asked questions about Flux Kontext Smart Image Editor. Learn about image uploading, AI conversational editing process, commercial use of images, and more.",
  keywords:
    "Flux Kontext FAQ, AI image editing FAQ, image editing AI, commercial use images, AI conversational photo editing",
  alternates: {
    canonical: "https://fluxkontext.tech/faq/",
  },
};

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Flux Kontext Smart Image Editor: Frequently Asked Questions
          </h1>
          <p className="text-center mb-8 text-gray-600">
            You might have some questions when using Flux Kontext Smart Image
            Editor. We have compiled common questions and their answers here,
            hoping to help you make better use of our tool.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">
                What is Flux Kontext Smart Image Editor?
              </h2>
              <p className="text-gray-700">
                Flux Kontext Smart Image Editor is a tool powered by the
                cutting-edge Flux.1 Kontext Pro AI model, which allows users to
                upload images and then communicate editing needs to the AI
                through smart conversations. The AI model precisely modifies
                images according to instructions and returns new images.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">
                Can edited images be used for commercial purposes?
              </h2>
              <p className="text-gray-700">
                Yes, all images generated or edited with Flux Kontext Smart
                Image Editor can be used for commercial purposes without
                additional authorization. You can confidently apply them to your
                marketing, design, product display, and various other commercial
                scenarios.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">
                How to ensure AI understands my editing needs?
              </h2>
              <p className="text-gray-700">
                AI's understanding depends on the text description you provide.
                Please be as specific and clear as possible when describing your
                editing requirements, including the objects to be modified,
                desired effects, styles, etc. If the first attempt is not ideal,
                you can try more detailed or different descriptions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">
                Do I need professional image editing skills?
              </h2>
              <p className="text-gray-700">
                No, not at all. Flux Kontext Smart Image Editor is designed to
                help you edit images through natural language conversations,
                without requiring complex image editing software knowledge or
                professional skills. You only need to describe it in words.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">
                Is my image data secure?
              </h2>
              <p className="text-gray-700">
                We attach great importance to user privacy and data security.
                Regarding the processing and storage of image data, please refer
                to our privacy policy, which will detail how we protect your
                information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">
                Are there any quantity or size limits for generating or editing
                images?
              </h2>
              <p className="text-gray-700">
                Currently, we are committed to providing users with a flexible
                editing experience. For specific image size or quantity limits,
                please refer to our latest service description or contact
                customer service directly for detailed information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">
                How should I report issues or provide feedback?
              </h2>
              <p className="text-gray-700">
                We highly value user feedback. If you encounter any problems
                during use, have suggestions for improvement, or want to share
                your creations, please contact us through the contact
                information on our website (e.g., email, community forum, etc.).
                Your feedback is crucial for our continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
