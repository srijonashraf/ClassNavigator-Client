import { Link } from "react-router-dom";

const Breadcrumb = ({classId, courseId}) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item small">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item small">
          <Link to={`/`}>Classes</Link>
        </li>
        <li className="breadcrumb-item small">
          <Link to={`/courses/${classId}`}>Courses</Link>
        </li>
        <li className="breadcrumb-item small active" aria-current="page">
        <Link to={`/tasks/${classId}/${courseId}`}>Tasks</Link>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
