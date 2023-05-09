import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

export enum MatchMessageError {
  NO_MONSTER_FOUND = "No 'Monster' record(s) (needed to inline the relation on 'MatchWaitingList' record(s)) was found for a nested connect on one-to-many relation 'MatchWaitingListToMonster'.",
  NO_MATCH_FOUND = "No 'Match' record (needed to inline the relation on 'MatchWaitingList' record) was found for a nested create on one-to-many relation 'MatchToMatchWaitingList'.",
  MONSTER_IS_ALREADY_IN_THE_WAITING_LIST = "Monster is already in the waiting list",
}

export const handleMatchMessageError = (error: { meta: { cause: string } }) => {
  if (error.meta) {
    switch (error.meta.cause) {
      case MatchMessageError.NO_MONSTER_FOUND:
        throw new NotFoundException("No monster found for this id");
      case MatchMessageError.NO_MATCH_FOUND:
        throw new NotFoundException("No match found for this id");

      default:
        throw new InternalServerErrorException(error.meta.cause);
    }
  } else {
    throw new InternalServerErrorException(String(error));
  }
};
