port module Elm.Ports exposing (setPlayPauseStatusPort, receivePlayPauseStatusPort)

-- PORT


port setPlayPauseStatusPort : String -> Cmd msg
port receivePlayPauseStatusPort : (String -> msg) -> Sub msg
