import React, { FC } from "react";
import { styles } from "~/constants/contact";

interface IProps extends React.HTMLProps<any> {
  label?: string;
}

const Input: FC<IProps> = ({ label, className, type, ...props }) => {
  return (
    <div
      className={"mb-2 " + className}
      style={{
        width: "100%",
        //create curvy border

      }}
    >
      <label>{label}</label>
      <div
        className="rounded-lg border border-red-400 "
        style={{
          borderWidth: 4,
          padding: "2px",
          //create curvy border 
          // create shadow
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

        }}
      >
        {type === "textarea" ? (
          <textarea {...props} className={styles.inputClass} rows={10} />
        ) : (
          <input
            {...{ type: type || "default", ...props }}
            className={styles.inputClass}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
