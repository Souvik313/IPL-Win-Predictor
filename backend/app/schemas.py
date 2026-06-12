from pydantic import BaseModel

class MatchInput(BaseModel):
    batting_team: str
    bowling_team: str
    city: str

    runs_left: float
    balls_left: float
    wickets_left: int

    target: float
    crr: float
    rrr: float