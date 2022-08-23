import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DetailSetting from "./DetailSetting";
import { useNavigate } from "react-router-dom";
import "./Detail.css";

const DetailHeader = ({ title }) => {
  const navigate = useNavigate();

  const [isSetting, setSetting] = useState(false);
  const onSetting = () => {
    setSetting(!isSetting);
  };

  return (
    <div className="DatailHeader">
      <h2 onClick={() => navigate("/main")}>{title}</h2>
      <FontAwesomeIcon
        icon={faEllipsis}
        className="memo-setting"
        onClick={onSetting}
      />
      {isSetting && <DetailSetting />}
    </div>
  );
};
export default DetailHeader;
