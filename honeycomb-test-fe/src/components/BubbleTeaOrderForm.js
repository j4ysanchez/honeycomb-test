import React, {useState} from 'react';

const BubbleTeaOrderForm = ({ onSubmit} ) => {
    const [flavor, setFlavor] = useState('');
    const [topping, setTopping] = useState('');
    const [size, setSize] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({flavor, topping, size});
    }

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label>Flavor</label>
                <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
                    <option value="">Select a Flavor</option>
                    <option value="roasted-milk-tea">Roasted Milk Tea</option>
                    <option value="milk-tea">Milk Tea</option>
                    <option value="matcha">Matcha</option>
                </select>
            </div>
            <div>
                <label>Topping</label>
                <select value={topping} onChange={(e) => setTopping(e.target.value)}>
                    <option value="">Select a Topping</option>
                    <option value="boba">Boba</option>
                    <option value="grass-jelly">Grass Jelly</option>
                    <option value="pudding">Pudding</option>
                    <option value="coconut-jelly">Coconut Jelly</option>
                </select>
            </div>

            <div>
                <label>Size</label>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Select a Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Super Cup</option>
                </select>
            </div>

            <button type="submit">Order</button>
        </form>
    )

}

export default BubbleTeaOrderForm;
