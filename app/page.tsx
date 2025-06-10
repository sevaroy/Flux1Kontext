export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Flux Kontext Smart Image Editor: Your AI Creative Partner
          </h1>
          <p className="text-center mb-8 text-gray-600">
            Upload your images, engage in smart conversations with the Flux
            Kontext Pro AI model to precisely edit images according to your
            needs, and get new images ready for commercial use. Your creativity,
            powered by AI.
          </p>

          {/* This will be the new image editing feature area */}
          <Chat />

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">
              What can Flux Kontext Smart Image Editor do for you?
            </h2>
            <p className="mb-6 text-gray-700">
              Whether you&apos;re a designer, marketer, content creator, or a general
              user, Flux Kontext Smart Image Editor can help you. From simple
              touch-ups to complex element replacements, our AI tool can quickly
              and accurately edit images according to your instructions, giving
              your visual content a fresh look.
            </p>
            <h2 className="text-xl font-bold mb-4">
              Cutting-edge AI Technology, Unlimited Creativity
            </h2>
            <p className="mb-6 text-gray-700">
              Flux Kontext Smart Image Editor is powered by the robust Flux.1
              Kontext Pro AI model. We are committed to providing exceptional
              editing performance, allowing you to achieve complex image
              operations through natural language descriptions and unleash your
              limitless creative potential.
            </p>
            <h2 className="text-xl font-bold mb-4">
              Simple Operation, Stunning Results
            </h2>
            <p className="mb-6 text-gray-700">
              No professional skills required. Simply upload your image, then
              chat with the AI and tell it your editing needs. Flux Kontext
              Smart Image Editor will then present you with amazing editing
              effects. We provide an intuitive user interface, allowing you to
              easily manage and download your edited images.
            </p>
            <h2 className="text-xl font-bold mb-4">
              Generated Images are for Commercial Use
            </h2>
            <p className="mb-6 text-gray-700">
              All images generated or edited with Flux Kontext Smart Image
              Editor can be used for commercial purposes without additional
              authorization. You can confidently apply them to your marketing,
              design, product display, and various other commercial scenarios.
            </p>
            <h2 className="text-xl font-bold mb-4">
              Continuous Innovation, Serving You
            </h2>
            <p className="mb-6 text-gray-700">
              We are always committed to improving Flux Kontext Smart Image
              Editor, continuously introducing new features and optimizing model
              performance. Bookmark this page to always get the latest and most
              powerful AI image editing experience.
            </p>
            <h2 className="text-xl font-bold mb-4">
              Why Choose Flux Kontext Smart Image Editor?
            </h2>
            <ul className="list-disc list-inside mb-8 space-y-2 text-gray-700">
              <li>
                Intelligent conversational editing based on Flux.1 Kontext Pro
                AI model
              </li>
              <li>
                Upload images and make precise modifications via chat commands
              </li>
              <li>Quickly and efficiently complete complex image operations</li>
              <li>Generated images can be used for commercial purposes</li>
              <li>Continuously updated, powerful features</li>
            </ul>
            <h2 className="text-xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-bold">
                  How does Flux Kontext Smart Image Editor work?
                </h3>
                <p className="text-gray-700">
                  You upload an image, then communicate your editing needs to
                  the AI model through text conversation, and the model will
                  edit the image according to your instructions.
                </p>
              </div>
              <div>
                <h3 className="font-bold">
                  Can edited images be used for commercial purposes?
                </h3>
                <p className="text-gray-700">
                  Yes, all images generated or edited with Flux Kontext Smart
                  Image Editor can be used for commercial purposes.
                </p>
              </div>
              <div>
                <h3 className="font-bold">
                  Do I need professional image editing skills?
                </h3>
                <p className="text-gray-700">
                  No. Our tool is designed to help you edit images through
                  natural language conversations, without requiring complex
                  professional skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
