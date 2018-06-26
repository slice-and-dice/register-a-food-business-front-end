import SessionWrapper from "../src/components/SessionWrapper";
import FsaLayout from "../src/components/FsaLayout";
import ContentItem from "../src/components/ContentItem";
import { Header, Button, Paragraph, InsetText } from "govuk-react";
import { ButtonArrow } from "@govuk-react/icons";

const Index = props => (
  <FsaLayout>
    <Header level={1}>Register a food business</Header>

    <ContentItem.B_30_15>
      <ContentItem.B_30_15>
        <Paragraph>
          All food businesses which regularly produce or serve food to the
          public need to be registered with their Local Authority. This service
          will send your registration to the correct local authority based on
          your trading location.
        </Paragraph>
        <Paragraph mb={0}>
          Food businesses should only register **28 days** before they begin
          trading. If you are not sure when this food business will open, it may
          be too early to be registering this business.
        </Paragraph>
      </ContentItem.B_30_15>

      <InsetText className="bold">
        <Paragraph mb={0}>
          During this registration, you may come across a few specialist terms,
          which we have described below:
        </Paragraph>
      </InsetText>

      <ContentItem.B_30_15>
        <Header level={3} mb={1}>
          Food business operator
        </Header>
        <Paragraph mb={0}>
          The operator is the person, charity or company who makes the decisions
          about the food business, what it serves and how it operates.
        </Paragraph>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <Header level={3} mb={1}>
          Establishment
        </Header>
        <Paragraph mb={0}>
          The establishment is the location or site of your food business. If it
          is a mobile food business, please use the location where it is
          normally stored overnight.
        </Paragraph>
      </ContentItem.B_30_15>
    </ContentItem.B_30_15>

    <form action="/continue/index" method="post">
      <Button id="begin-button" type="submit" icon={<ButtonArrow />}>
        Begin registration
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(Index);
