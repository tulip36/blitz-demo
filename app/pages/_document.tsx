import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

import { InitializeColorMode } from "bumbag"
import { extractCritical } from "bumbag-server"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <InitializeColorMode />
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)
  const styles = extractCritical(initialProps.html)
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style
          data-emotion-css={styles.ids.join(" ")}
          dangerouslySetInnerHTML={{ __html: styles.css }}
        />
      </>
    ),
  }
}

export default MyDocument
