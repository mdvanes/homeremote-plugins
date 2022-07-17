@module
external styles: {
  "button-list-item": string,
  "mui-button": string,
  "button-success": string,
  "button-error": string,
} = "./DockerList.module.css"

let getDialog = (
  toggleContainerState: (
    DockerUtil.dockerContainer
  ) => Js.Promise.t<array<DockerUtil.dockerContainer>>,
  onClose: unit => unit,
  c: DockerUtil.selectedContainerType,
): React.element => {
  open Mui

  switch c {
  | NoContainer => <Mui.Dialog \"aria-labelledby"="dockerlist-dialog-title" \"open"={false}></Mui.Dialog>
  | DockerContainer(container) => {
      let state = container["State"]
      let isRunning = state == "running"
      let status = container["Status"]
      let name =
        container["Names"]
        ->Js.Array2.map(name => Js.String2.sliceToEnd(name, ~from=1))
        ->Js.Array2.joinWith(" ")
      let questionPrefix = "Do you want to"

      <Mui.Dialog \"aria-labelledby"="dockerlist-dialog-title" \"open"={true}>
        <DialogTitle id="dockerlist-dialog-title">
          {`${name} (${state})`->React.string}
        </DialogTitle>
        <Mui.DialogContent>
          <Typography> {status->React.string} </Typography>
          <Typography>
            {if isRunning {
              {`${questionPrefix} stop ${name}?`->React.string}
            } else {
              {`${questionPrefix} start ${name}?`->React.string}
            }}
          </Typography>
        </Mui.DialogContent>
        <DialogActions>
          <Button color=#secondary onClick={_ev => onClose()}> {"cancel"->React.string} </Button>
          <Button
            color=#primary
            onClick={_ev => {
              let _ = toggleContainerState(container)->Js.Promise.then_(_containers => {
                onClose()
                Js.Promise.resolve()
              }, _)
            }}>
            {"OK"->React.string}
          </Button>
        </DialogActions>
      </Mui.Dialog>
    }
  }
}

@react.component
let make = (
  ~container: DockerUtil.selectedContainerType,
  ~toggleContainerState: (
    DockerUtil.dockerContainer
  ) => Js.Promise.t<array<DockerUtil.dockerContainer>>,
  ~close: unit => unit,
) => {
  getDialog(toggleContainerState, close, container)
}
