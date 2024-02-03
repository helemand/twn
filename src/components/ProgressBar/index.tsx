import "./index.scss";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => (
  <div className="progress-container">
    <span className="label">Currently alive</span>
    <div className="progress">
      <div
        className="progress-indicator"
        style={{
          width: `${percentage}%`,
        }}
      >
        <span>{`${percentage}%`}</span>
      </div>
    </div>
  </div>
);

export default ProgressBar;
