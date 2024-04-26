import React from "react";
import Card from "react-bootstrap/Card";

function SwimmingCenterCard({ center, onClick }) {
  return (
    <div className="border-0 outline-none shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 rounded-xl" onClick={onClick}>
        <Card className="border-0 rounded-xl">
          <Card.Img variant="top" src="https://www.pool-aesthetics.com/wp-content/uploads/2020/12/01_show_slider.jpg" className="w-full p-0 rounded-tl-xl rounded-tr-xl" />
          <Card.Body>
            <Card.Title className="py-3 px-4 font-medium">
              {center.center_name}
            </Card.Title>
          </Card.Body>
        </Card>
    </div>
  );
}

export default SwimmingCenterCard;
