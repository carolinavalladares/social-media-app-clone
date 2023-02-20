import Router from "next/router";

export async function refreshData() {
  Router.replace(Router.asPath);
}
