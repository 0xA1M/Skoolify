function EventsPage() {
  return(
    <>
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Choose a Level</h1>
        {/* <!-- Level 1 --> */}
        <div className="p-4 rounded-lg shadow-lg bg-white mb-4 hover:shadow-xl transition duration-300">
            <a href="level1.html" className="block">
                <h2 className="text-xl font-semibold mb-2">Level 1</h2>
                <p className="text-gray-600">Subjects: Math, Physics, Science, Arabic</p>
            </a>
        </div>
        {/* <!-- Level 2 --> */}
        <div className="p-4 rounded-lg shadow-lg bg-white mb-4 hover:shadow-xl transition duration-300">
            <a href="level2.html" className="block">
                <h2 className="text-xl font-semibold mb-2">Level 2</h2>
                <p className="text-gray-600">Subjects: Math, Physics, Science, Arabic</p>
            </a>
        </div>
        {/* <!-- Level 3 --> */}
        <div className="p-4 rounded-lg shadow-lg bg-white mb-4 hover:shadow-xl transition duration-300">
            <a href="level3.html" className="block">
                <h2 className="text-xl font-semibold mb-2">Level 3</h2>
                <p className="text-gray-600">Subjects: Math, Physics, Science, Arabic</p>
            </a>
        </div>
        {/* <!-- Level 4 --> */}
        <div className="p-4 rounded-lg shadow-lg bg-white mb-4 hover:shadow-xl transition duration-300">
            <a href="level4.html" className="block">
                <h2 className="text-xl font-semibold mb-2">Level 4</h2>
                <p className="text-gray-600">Subjects: Math, Physics, Science, Arabic</p>
            </a>
        </div>
    </div>

    </>
  );
}

export default EventsPage;
