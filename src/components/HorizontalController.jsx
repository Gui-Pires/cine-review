import { useRef } from "react";

function HorizontalController({ items, title }) {
    const scrollRef = useRef(null);
    const amount = 350;

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth"
        })
    }

    return (
        <div className="my-3">
            <h5>{title}</h5>
            <div className='d-flex position-relative overflow-hidden'>
                <button className='btn btn-scroll start-0' onClick={() => scroll("left")}>
                    <i className="bi bi-arrow-left-short"></i>
                </button>

                <div className="row flex-nowrap gap-1 scroll-container px-3 overflow-x-scroll" ref={scrollRef}>
                    {items}
                </div>

                <button className='btn btn-scroll end-0' onClick={() => scroll("right")}>
                    <i className="bi bi-arrow-right-short"></i>
                </button>
            </div>
        </div>
    )
}

export default HorizontalController;