import Button from "@/Button.tsx";
import { Showcase, ShowcaseItem, story } from "story";

export default story({
  title: "Button",
  description: () => (
    <p>
      Buttons are used to trigger an action as well as navigation.
    </p>
  ),
  island: true,
  showcase: () => (
    <Showcase>
      <ShowcaseItem title="Button with primary variant">
        <Button>Do something</Button>
      </ShowcaseItem>
      <ShowcaseItem title="Button with secondary variant">
        <Button variant="secondary">Do something</Button>
      </ShowcaseItem>
      <ShowcaseItem title="Button with different color">
        <Button color="fuchsia" onClick={() => console.log("hello")}>
          Do something
        </Button>
      </ShowcaseItem>
    </Showcase>
  ),
});
