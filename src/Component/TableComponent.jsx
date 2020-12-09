import { map } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  StyledThead,
  StyledTbody,
  Styledtr,
  Styledtd,
  Styledth,
  Styledtable,
} from "./TableComponent.styles";

export const TableComponent = ({ data, columns }) => {
  return (
    <Styledtable>
      <StyledThead>
        <Styledtr>
          {map(columns, (col, id) => (
            <Styledth key={col + id}>{col.title}</Styledth>
          ))}
        </Styledtr>
      </StyledThead>
      <StyledTbody>
        {map(data, (set, id) => (
          <Styledtr key={set.city + id + set.country}>
            {map(columns, (col, id) => (
              <Styledtd key={set.temp + col.id + id}>{set[col.id]}</Styledtd>
            ))}
          </Styledtr>
        ))}
      </StyledTbody>
    </Styledtable>
  );
};

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

TableComponent.defaultProps = {
  columns: [],
};
