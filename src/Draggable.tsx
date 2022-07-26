
import React, { useEffect } from "react";
import './css/Draggable.css';

interface Props {
	children: JSX.Element;
}
interface Position {
  x: number;
  y: number;
}

const Draggable = ({ children }: Props) => {
  let translate: Position = { x: 0, y: 0 };
  let client: Position = { x: 0, y: 0 };

  const dragElement = (event: MouseEvent) => {
    event.preventDefault();
    const eventTarget = event.currentTarget as HTMLElement;
    const widthLimit = Math.round((window.innerWidth - eventTarget.clientWidth)/2);
    const heightLimit = window.innerHeight - eventTarget.clientHeight;

		translate.x = translate.x - (client.x - event.clientX); 
    translate.y = translate.y - (client.y - event.clientY);
		client.x = event.clientX;
    client.y = event.clientY;

    if (translate.x < -widthLimit) {
			translate.x = -widthLimit;
		} else if (translate.x > widthLimit) {
			translate.x = widthLimit;
		}; 

    if (translate.y < 0) {
      translate.y = 0
    } else if (translate.y > heightLimit) {
			translate.y = heightLimit;
		};

    eventTarget.style.transform =
			"translate(" + translate.x + "px, " + translate.y + "px)";
  };
  
  const addDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const eventTarget = event.currentTarget as HTMLElement;
    client.x = event.clientX;
    client.y = event.clientY;

		eventTarget.addEventListener("mousemove", dragElement);
  };
  
  const removeDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const eventTarget = event.currentTarget as HTMLElement;
    
		eventTarget.removeEventListener("mousemove", dragElement);
  };

  useEffect(() => {
    console.log('hello! have fun dragging!')
  }, [])
  
  return (
    <div
    className="draggable"
    draggable="true"
    onMouseDown={addDrag}
    onMouseUp={removeDrag}>
    {children}
  </div>
  )
};

export default Draggable;
