import FsaHeader from "./FsaHeader";
import { GridRow, GridCol, Layout } from "govuk-react";

const FsaLayout = props => (
  <div>
    <FsaHeader />
    <div style={{ maxWidth: "960px", margin: "auto", paddingTop: "1.25em" }}>
      <Layout>
        <GridRow>
          <GridCol columnTwoThirds>{props.children}</GridCol>
        </GridRow>
      </Layout>
    </div>
  </div>
);

export default FsaLayout;
