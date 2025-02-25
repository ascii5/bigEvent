package org.example.mapper;

import org.apache.ibatis.annotations.*;
import org.example.pojo.Article;

import java.util.List;

@Mapper
public interface ArticleMapper {
    @Insert("insert into article(title,content,cover_img,state,category_id,create_user,create_time,update_time)"
            +" values(#{title},#{content},#{coverImg},#{state},#{categoryId},#{createUser},#{createTime},#{updateTime})"
    )
    void add(Article article);

    List<Article> list(Integer userId, Integer categoryId, String state);

    @Delete("delete from article where id = #{id}")
    void delete(Integer id);

    @Update("update article set title = #{article.title}, content=#{article.content},cover_img=#{article.coverImg},state=#{article.state},category_id=#{article.categoryId},update_time=#{article.updateTime} where id = #{id}")
    void update(@Param("article")Article article, @Param("id")Integer id);
}
