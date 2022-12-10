import Button from "@/Button.tsx";
import {
  Description,
  Island,
  Showcase,
  ShowcaseItem,
  story,
  Title,
} from "story";

const component = story(Button);
export default component;

<Island for={component} />;

<Title for={component}>Buttons</Title>;

<Description for={component}>
  Buttons are used to trigger an action as well as navigation.
</Description>;

<Showcase for={component}>
  <ShowcaseItem title="Button with primary importance">
    <Button>Search</Button>
  </ShowcaseItem>
  <ShowcaseItem title="Button with secondary importance">
    <Button importance="secondary">Search</Button>
  </ShowcaseItem>
</Showcase>;
