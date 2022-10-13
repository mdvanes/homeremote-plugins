module Elm.Controls exposing (Model, Msg(..), init, update, view, subscriptions)

import Elm.Ports exposing (setPlayPauseStatusPort, messageReceiver)
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, classList)
import Elm.PlaySvgIcon
import Elm.PauseSvgIcon

type alias Model =
    { currentStatus : String }


type Msg
    = SetPlayPauseStatus PlayPauseStatus
    | SetPlayPauseStatusStr String


type PlayPauseStatus
    = Play
    | Pause

statusToString : PlayPauseStatus -> String
statusToString status =
    case status of  
        Play ->
            "Play"
        Pause ->
            "Pause"

init : ( Model, Cmd Msg )
init =
    ( { currentStatus = "" }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetPlayPauseStatus status ->
            let
                statusStr = (statusToString status)
            in
            ( { model | currentStatus = statusStr }, setPlayPauseStatusPort statusStr )
        SetPlayPauseStatusStr statusStr ->
            ( { model | currentStatus = statusStr }, setPlayPauseStatusPort statusStr )


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    messageReceiver SetPlayPauseStatusStr



-- VIEW

view : Model -> Html Msg
view model =
    div
        [ class "controls" ]
        [ button
            [ classList 
                [ ("play", True)
                , ("controls-button", True)
                , ("active", model.currentStatus == "Play")
                ]
            , onClick (SetPlayPauseStatus Play) ]
            [ Elm.PlaySvgIcon.view ]
        , button
            [ class "pause controls-button"
            , onClick (SetPlayPauseStatus Pause) ]
            [ Elm.PauseSvgIcon.view ]
        ]
