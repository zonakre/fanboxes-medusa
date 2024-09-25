import { ComponentType } from "react"
import { LoaderFunctionArgs, RouteObject } from "react-router-dom"
import { ErrorBoundary } from "../../components/utilities/error-boundary"
import { RouteExtension } from "../../providers/medusa-app-provider/types"

/**
 * Used to test if a route is a settings route.
 */
export const settingsRouteRegex = /^\/settings\//

export const createRouteMap = (
  routes: RouteExtension[],
  ignore?: string
): RouteObject[] => {
  const root: RouteObject[] = []

  const addRoute = (
    pathSegments: string[],
    Component: ComponentType,
    currentLevel: RouteObject[],
    loader?: (args: LoaderFunctionArgs) => Promise<any>
  ) => {
    if (!pathSegments.length) {
      return
    }

    const [currentSegment, ...remainingSegments] = pathSegments
    let route = currentLevel.find((r) => r.path === currentSegment)

    if (!route) {
      route = { path: currentSegment, children: [] }
      currentLevel.push(route)
    }

    if (remainingSegments.length === 0) {
      route.children ||= []
      route.children.push({
        path: "",
        ErrorBoundary: ErrorBoundary,
        async lazy() {
          if (loader) {
            return { Component, loader }
          }

          return { Component }
        },
      })
    } else {
      route.children ||= []
      addRoute(remainingSegments, Component, route.children, loader)
    }
  }

  routes.forEach(({ path, Component, loader }) => {
    // Remove the ignore segment from the path if it is provided
    const cleanedPath = ignore
      ? path.replace(ignore, "").replace(/^\/+/, "")
      : path.replace(/^\/+/, "")
    const pathSegments = cleanedPath.split("/").filter(Boolean)
    addRoute(pathSegments, Component, root, loader)
  })

  return root
}
