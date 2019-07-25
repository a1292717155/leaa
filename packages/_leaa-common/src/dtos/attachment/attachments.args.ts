import { IsOptional } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

import { ItemsArgs } from '@leaa/common/dtos/_common';

@ArgsType()
export class AttachmentsArgs extends ItemsArgs {
  @IsOptional()
  @Field(() => String, { nullable: true })
  public readonly type?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  public readonly moduleName?: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  public readonly moduleId?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  public readonly moduleType?: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  public readonly categoryId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  public readonly userId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  public readonly refreshHash?: number;
}