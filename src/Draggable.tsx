import React from "react";

interface Props {
  children: React.ReactNode;
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
    const eventTarget = event.target as HTMLElement;
    const maxWidth = window.innerWidth - eventTarget.clientWidth;
    const maxHeight = window.innerHeight - eventTarget.clientHeight;
		translate.x = translate.x - (client.x - event.clientX);
		translate.y = translate.y - (client.y - event.clientY);
		client.x = event.clientX;
		client.y = event.clientY;

    if (translate.x < 0) {
      translate.x = 0
    } else if (translate.x >= maxWidth) {
      translate.x = maxWidth
    }; 

    if (translate.y < 0) {
      translate.y = 0
    } else if (translate.y > maxHeight) {
      translate.y = maxHeight
    };

		eventTarget.style.transform =
			"translate(" + translate.x + "px, " + translate.y + "px)";
  };
  
  const addDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const eventTarget = event.target as HTMLElement;
    client.x = event.clientX;
    client.y = event.clientY;
		eventTarget.addEventListener("mousemove", dragElement);
  };
  
	const removeDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = event.target as HTMLElement;
		eventTarget.removeEventListener("mousemove", dragElement);
  };
  
  return <div
    draggable="true"
    onMouseDown={addDrag}
    onMouseUp={removeDrag}>
    {children}
  </div>;
};

export default Draggable;
