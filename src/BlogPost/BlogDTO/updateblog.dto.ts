
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdateBlogDto{
    
    @ApiProperty()
    blogname : String;
    @ApiProperty()
    genre : String;
    @ApiProperty()
    description : String;
    @ApiProperty()
    problem : String;
    @ApiProperty()
    summary : String;
}