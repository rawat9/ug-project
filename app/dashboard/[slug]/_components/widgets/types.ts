export type WidgetType = 'Text'

export type Widget = {
  type: WidgetType
  viewComponent: React.FC
  propertiesComponent: React.FC
}
