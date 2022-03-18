const App = () => {
    const list = Array.from({ length: 100 }, (_, index) => index + 1)
    return (
        <ul>
            {list.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}

export default App
