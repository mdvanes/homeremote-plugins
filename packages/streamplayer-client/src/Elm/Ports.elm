port module Elm.Ports exposing (setPlayPauseStatusPort, messageReceiver)

-- PORT


port setPlayPauseStatusPort : String -> Cmd msg
port messageReceiver : (String -> msg) -> Sub msg
