import { Link } from "react-router";
import forwardIcon from "../../../assets/icons/forward.svg";
import { Header } from "@/design-system/Header";
import { PageLayout } from "@/design-system/PageLayout";
import { routes } from "@/routes";

export function HomePage() {
  const listed = routes.filter((route) => route.title);

  return (
    <PageLayout
      background="weak"
      header={<Header variant="main" title="Rallit 프로토타입" />}
    >
      <ul className="m-0 flex list-none flex-col gap-medium p-0 py-inset-large">
        {listed.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="flex items-center gap-medium rounded-lg bg-neutral-default p-inset-large text-fg-neutral-default no-underline"
            >
              <span className="flex min-w-0 flex-1 flex-col gap-micro">
                <span className="typography-headline-bold">{route.title}</span>
                {route.description && (
                  <span className="typography-label-r-regular text-fg-neutral-secondary">
                    {route.description}
                  </span>
                )}
              </span>
              <img src={forwardIcon} alt="" className="shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
