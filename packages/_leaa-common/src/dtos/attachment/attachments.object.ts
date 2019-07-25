import { ObjectType, Field } from 'type-graphql';

import { Attachment } from '@leaa/common/entrys';

@ObjectType()
export class AttachmentsObject {
  @Field(() => [Attachment])
  public readonly items: Attachment[] = [];
}