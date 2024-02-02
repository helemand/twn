import "./index.scss";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div className="progress-container">
      <span className="label">Currently alive</span>
      <div className="progress">
        <div
          className="progress-indicator"
          style={{
            width: `${props.percentage}%`,
          }}
        >
          <span>{`${props.percentage}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
