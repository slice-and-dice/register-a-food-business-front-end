import FsaHeader from "./FsaHeader";
import { GridRow, GridCol, Layout } from "govuk-react";

const FsaLayout = props => (
  <div>
    <FsaHeader />
    <Layout>
      <GridRow>
        <GridCol columnTwoThirds>{props.children}</GridCol>
      </GridRow>
    </Layout>
  </div>
);

export default FsaLayout;
