function About() {

    return (
        <div className="w-full max-w-[1240px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 px-4 xl:px-0 text-white my-8">
                <div className="col-span-1 relative">
                    <img src="https://cdn.shopify.com/s/files/1/0012/4957/4961/products/smallmechanicalkeybaord.png?v=1629452954" alt="about" className="p-4 w-full h-full object-cover" />
                    <h1 className="absolute top-10 left-8 font-extrabold text-4xl text-white">Fun fact</h1>
                </div>
                <div className="col-span-2 py-2 md:py-8">
                    <hr className="w-48 h-1 bg-white rounded border-0" />
                    <h1 className="py-10 text-xl">
                        When you hit spacebar, 600000 people in the world did just the same

                        The QWERTY keyboard has been around for over 130 years. It was created by Christopher Sholes in 1868 for use as his type-writer

                        Scroll Lock is a defunct key on modern keyboards. It was originally used to lock the keyboard so the user could move the cursor around without anything being typed. However, with the invention of the mouse and touchpads, this key is no longer needed
                    </h1>
                </div>
            </div>
        </div>

    )
}

export default About
