import { useRef } from "react";

export default function HorizontalScroller({ items, title }) {
    const scrollRef = useRef(null);
    const amount = 350;

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth"
        });
    };

    return (
        <div className="container-fluid pt-3">
            <h5 className="mt-2">{title}</h5>

            <div className='d-flex align-item-center position-relative'>

                <button className='btn btn-scroll start-0' onClick={() => scroll("left")}>
                    <i className="bi bi-arrow-left-short"></i>
                </button>

                <div
                    className="d-flex flex-nowrap overflow-x-auto gap-1 scroll-container"
                    ref={scrollRef}
                >
                    {items}
                </div>

                <button className='btn btn-scroll end-0' onClick={() => scroll("right")}>
                    <i className="bi bi-arrow-right-short"></i>
                </button>

            </div>
        </div>
    );
}