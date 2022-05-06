import Page from 'components/Page';
import TextBlock from 'components/TextBlock';

const About = () => {
  return (
    <Page>
      <Page.Content>
        <Page.Title>About</Page.Title>

        <TextBlock>
          <p>
            This is a small program with a very specific use case - allowing you
            to have a palette of text to easily copy from.
          </p>
          <p>
            This project is open source! You can{' '}
            <a
              href="https://github.com/aitc-h/clipboard-helper"
              target="_BLANK"
            >
              view the full code on the GitHub repository
            </a>
            . Issues and improvement ideas can be submitted on the{' '}
            <a
              href="https://github.com/aitc-h/clipboard-helper/issues"
              target="_BLANK"
            >
              GitHub Issues page
            </a>
            .
          </p>
        </TextBlock>
      </Page.Content>
    </Page>
  );
};

export default About;
