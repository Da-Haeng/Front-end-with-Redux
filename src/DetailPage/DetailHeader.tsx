import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DetailSetting from "./DetailSetting";
import { useNavigate } from "react-router-dom";
import "./Detail.css";
<<<<<<< HEAD:src/DetailPage/DetailHeader.js

const DetailHeader = ({ title }) => {
  const navigate = useNavigate();

=======

type DatailHeaderProps = {
  title: string;
};
const DetailHeader = ({ title }: DatailHeaderProps) => {
  const navigate = useNavigate();

>>>>>>> a3c0b06c77158f6883f773f4da3cf0f18f9f2acf:src/DetailPage/DetailHeader.tsx
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
