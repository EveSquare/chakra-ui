import { ThemingProps, defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { useMemo } from "react"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { ButtonGroupContext, ButtonGroupProvider } from "./button-context"
import { ButtonGroupOptions } from "./button-types"

export interface ButtonGroupProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Button">,
    ButtonGroupOptions {}

const attachedStyles = {
  horizontal: defineStyle({
    "> *:first-of-type:not(:last-of-type)": { borderEndRadius: 0 },
    "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
    "> *:not(:first-of-type):last-of-type": { borderStartRadius: 0 },
  }),
  vertical: defineStyle({
    "> *:first-of-type:not(:last-of-type)": { borderBottomRadius: 0 },
    "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
    "> *:not(:first-of-type):last-of-type": { borderTopRadius: 0 },
  }),
}

const gapStyles = {
  horizontal: (spacing: any) =>
    defineStyle({
      "& > *:not(style) ~ *:not(style)": { marginStart: spacing },
    }),
  vertical: (spacing: any) =>
    defineStyle({
      "& > *:not(style) ~ *:not(style)": { marginTop: spacing },
    }),
}

export const ButtonGroup = forwardRef<ButtonGroupProps, "div">(
  function ButtonGroup(props, ref) {
    const {
      size,
      colorScheme,
      variant,
      className,
      spacing = "0.5rem",
      isAttached,
      isDisabled,
      orientation = "horizontal",
      ...rest
    } = props

    const _className = cx("chakra-button__group", className)

    const context: ButtonGroupContext = useMemo(
      () => ({ size, colorScheme, variant, isDisabled }),
      [size, colorScheme, variant, isDisabled],
    )

    let groupStyles = defineStyle({
      display: "inline-flex",
      ...(isAttached
        ? attachedStyles[orientation]
        : gapStyles[orientation](spacing)),
    })

    const isVertical = orientation === "vertical"

    return (
      <ButtonGroupProvider value={context}>
        <chakra.div
          ref={ref}
          role="group"
          __css={groupStyles}
          className={_className}
          data-attached={isAttached ? "" : undefined}
          data-orientation={orientation}
          flexDir={isVertical ? "column" : undefined}
          {...rest}
        />
      </ButtonGroupProvider>
    )
  },
)

ButtonGroup.displayName = "ButtonGroup"
