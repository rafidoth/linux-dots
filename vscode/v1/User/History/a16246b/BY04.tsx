import React from "react";

type Props = {
  textlines: string[];
};

const HighlightedText = (props: Props) => {
    return (<div>
    props.textlines.map((line, index) => {
        return <span></span> 
    });
</div>)
};

export default HighlightedText;
