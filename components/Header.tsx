const Header = () => {
  return (
    <header className="border-b border-gray-200 py-4">
      <a
        href="/"
        className="container mx-auto px-4 flex justify-start gap-4 items-center"
      >
        {/* <img
          src="/favicon.svg"
          alt="heic to pdf online converter"
          className="w-10 h-10"
        /> */}
        <a href="/" className="text-2xl font-bold text-gray-800">
          Flux Kontext Smart Image Editor
        </a>
      </a>
    </header>
  );
};

export default Header;
