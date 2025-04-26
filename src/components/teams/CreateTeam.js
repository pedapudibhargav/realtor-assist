import React from 'react'

export default function CreateTeam() {
    const [errors, setErrors] = React.useState([]);
    const validateFormData = (formData) => {
        const errors = [];
        if (!formData.get('teamName')) {
            errors.push('Team Name is required');
        }
        if (!formData.get('teamDescription')) {
            errors.push('Team Description is required');
        }
        setErrors(errors);
        return errors.length === 0;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        if (validateFormData(formData)) {
            // Perform the API call to create the team
            console.log('Creating team with data:', data);
            // Reset the form
            event.target.reset();
        } else {
            console.log('Form validation failed');
        }
    }
    return (
        <>
            <form>
                <div>
                    <label htmlFor="teamName">Team Name</label>
                    <input type="text" id="teamName" name="teamName" required />
                </div>
                <div>
                    <label htmlFor="teamDescription">Team Description</label>
                    <textarea id="teamDescription" name="teamDescription" required></textarea>
                </div>
                {
                    errors.length > 0 && (
                        <div>
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                <button type="submit">Create Team</button>
            </form>
        </>
    )
}
