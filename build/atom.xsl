<xsl:stylesheet version="1.0"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                exclude-result-prefixes="atom xhtml">

  <!--

    Copyright Jing Huang 2025.

    Use and distribution of this code are permitted under the terms of the
    MIT License, compatible with Apache 2, GNU Generic Public License, etc.

    2025        XSLT Sheet for Displaying Atom Feed

  -->

  <xsl:output method="html" encoding="utf-8" indent="no"
              omit-xml-declaration="yes"/>

  <xsl:template match="/">
    <xsl:apply-templates mode="virgin"/>
  </xsl:template>

  <xsl:template mode="virgin" match="atom:feed">
    <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
    <html lang="en">
      <head>
        <meta content="charset=utf-8"/>
        <title>Memoir RnE -- Feed</title>
        <link rel="stylesheet" href="/style/memoir.css"/>
      </head>
      <body>
        <div class="meta">
          <div class="header">
            <a class="header-left" href="{atom:id}" target="_blank"><img class="avatar" src="{atom:logo}"/></a>
            <div class="header-right"><span class="description">
              <xsl:variable name="contact" select="atom:author/atom:email"/>
              <a class="title" href="mailto:{$contact}"><xsl:value-of select="atom:title"/></a>
              <span class="bio"><xsl:value-of select="atom:subtitle"/></span>
            </span></div>
          </div>
        </div>
        <xsl:for-each select="atom:entry">
          <div class="memoir" id="c{substring-after(atom:id,'#')}">
            <div class="content">
              <xsl:choose>
                <xsl:when test="atom:content/@type='xhtml'">
                  <xsl:copy-of select="atom:content/xhtml:div/*"/>
                </xsl:when>
                <xsl:when test="atom:summary/@type='xhtml'">
                  <xsl:copy-of select="atom:summary/xhtml:div/*"/>
                </xsl:when>
                <xsl:otherwise>
                  <p><xsl:value-of select="atom:content|atom:summary"/></p>
                </xsl:otherwise>
              </xsl:choose>
            </div>
            <div class="discrete">
              <span class="date">
                <xsl:variable name="year" select="substring(atom:updated,1,4)"/>
                <xsl:variable name="month" select="substring(atom:updated,6,2)"/>
                <xsl:variable name="day" select="substring(atom:updated,9,2)"/>
                <xsl:choose>
                  <xsl:when test="$month=1">January</xsl:when>
                  <xsl:when test="$month=2">February</xsl:when>
                  <xsl:when test="$month=3">March</xsl:when>
                  <xsl:when test="$month=4">April</xsl:when>
                  <xsl:when test="$month=5">May</xsl:when>
                  <xsl:when test="$month=6">June</xsl:when>
                  <xsl:when test="$month=7">July</xsl:when>
                  <xsl:when test="$month=8">August</xsl:when>
                  <xsl:when test="$month=9">September</xsl:when>
                  <xsl:when test="$month=10">October</xsl:when>
                  <xsl:when test="$month=11">November</xsl:when>
                  <xsl:when test="$month=12">December</xsl:when>
                </xsl:choose>
                <xsl:text> </xsl:text>
                <xsl:value-of select="$day"/>
                <xsl:text>, </xsl:text>
                <xsl:value-of select="$year"/>
              </span>
              <span class="time">
                <xsl:value-of select="substring(atom:updated,12,8)"/>
              </span>
              <xsl:if test="atom:published!=atom:updated">
                <span class="status">Edited</span>
              </xsl:if>
            </div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
