import { Component } from "react";
import styles from "./error-page.module.scss";

interface ErrorPageProps {
  error: unknown;
}

export class ErrorPage extends Component<ErrorPageProps> {
  render() {
    const message = this.props.error instanceof Error ? this.props.error.message : String(this.props.error);

    return (
      <div className={styles.errorPage}>
        <h2>Extension Error</h2>
        <pre>{message}</pre>
      </div>
    );
  }
}

export function withErrorPage(element: JSX.Element): JSX.Element {
  try {
    return element;
  } catch (error) {
    return <ErrorPage error={error} />;
  }
}
