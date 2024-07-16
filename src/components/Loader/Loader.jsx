import './Loader.css';

const Loader = () => {
    return (
        <div className="bbmoney-loader-container">
            <div className="bbmoney-loader">
                {['B', 'B', '-', 'M', 'o', 'n', 'e', 'y'].map((letter, index) => (
                    <span key={index} className="bbmoney-loader-letter">{letter}</span>
                ))}
            </div>
        </div>
    );
};

export default Loader;
