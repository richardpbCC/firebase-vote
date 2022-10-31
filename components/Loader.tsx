const Loader = () => {
    return (
        <div
            style={{
                maxWidth: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                style={{ fontSize: 32, marginRight: 8 }}
            >
                Loading...
            </div>
        </div>
    )
}

export default Loader;