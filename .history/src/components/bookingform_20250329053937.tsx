"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

interface MenuItem {
    id: number;
    name: string;
    price: number;
}

interface Genre {
    name: string;
    items: MenuItem[];
}

const genres: Genre[] = [
    {
        name: "Italian",
        items: [
            { id: 1, name: "Pizza", price: 10 },
            { id: 2, name: "Pasta", price: 8 },
        ],
    },
    // Add more genres as needed
];

const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C"];

const BookingForm: React.FC = () => {
    const [name, setName] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);

    const handleSelectItem = (item: MenuItem) => {
        setSelectedItems((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const handleNext = () => {
        const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalPrice);
        setStep(2);
        setIsModalOpen(false);
    };

    const handlePayment = () => {
        // Implement payment logic here
        setStep(3);
    };

    return (
        <div>
            <h1>Booking Form</h1>
            <div>
                <label>
                    Name:
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Restaurant:
                    <Select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                        <option value="">Select a restaurant</option>
                        {restaurants.map((rest) => (
                            <option key={rest} value={rest}>
                                {rest}
                            </option>
                        ))}
                    </Select>
                </label>
            </div>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>Select Menu</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {genres.map((genre) => (
                            <div key={genre.name}>
                                <h3>{genre.name}</h3>
                                {genre.items.map((item) => (
                                    <div key={item.id}>
                                        <span>{item.name}</span>
                                        <Button onClick={() => handleSelectItem(item)}>Add</Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <Button onClick={() => setIsModalOpen(true)}>Next</Button>
                    </PopoverContent>
                </Popover>
            </div>

            {step === 2 && (
                <div>
                    <h2>Total: ${total}</h2>
                    <Button onClick={handlePayment}>Proceed to Payment</Button>
                </div>
            )}

            {step === 3 && <div>Payment Page</div>}

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    <ModalHeader>Selected Items</ModalHeader>
                    <ModalBody>
                        {selectedItems.map((item) => (
                            <div key={item.id}>
                                {item.name}: ${item.price}
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleNext}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default BookingForm;
