import { useEffect, useState } from "react"

export function ContactFilter(props) {

    const [filterBy, setFilterBy] = useState(props.filterBy)


    useEffect(() => {
        props.onChangeFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break
            case 'checkbox':
                value = target.checked
            default:
                break
        }

        setFilterBy(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))

    }

    const { model, type, minBatteryStatus, maxBatteryStatus } = filterBy
    return (
        <div className="contact-filter">
            <input onChange={handleChange} value={model} name="txt" type="text" placeholder="Search Contacts" />
        </div>
    )
}
