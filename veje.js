"use strict";

class V_Point {
  constructor() {
    this.X = 0;
    this.Y = 0;
  }
}

$(function () {


  let t_para = 0;

  /**
   * 
   * @param {V_Point} arg_PointA 
   * @param {V_Point} arg_PointB 
   */
  function getPointZahyo(arg_PointA, arg_PointB) {
    let rem_val = 1 - t_para;
    let rtn_point = new V_Point();
    rtn_point.X = (arg_PointA.X * rem_val) + (arg_PointB.X * t_para);
    rtn_point.Y = (arg_PointA.Y * rem_val) + (arg_PointB.Y * t_para);
    return rtn_point;
  }

  function moveAnimetion() {
    t_para += 0.01;
    if (1.0 < t_para) {
      t_para = 0;
    }

    reDraw_point1();
    reDraw_point2();

    let A = { X: 75, Y: 25 };
    let B = { X: 425, Y: 25 };
    let rnt = getPointZahyo(A, B, t_para);
    $('#move_circle').attr('cx', rnt.X);
    $('#move_circle').attr('cy', rnt.Y);
    $('#move_circle2').attr('cx', rnt.X);
    $('#move_circle2').attr('cy', rnt.Y);


    window.requestAnimationFrame(moveAnimetion);
  }

  // 1次ベジェ曲線における処理群

  /**
   * 1次ベジェ曲線 座標再計算処理
   */
  function reCalucrete_point() {
    /** @type {JQuery}  */
    let $point_start = $('[data-ctlpoint-A="start"]');
    /** @type {JQuery}  */
    let $point_end = $('[data-ctlpoint-A="end"]');

    /** @type {V_Point}  */
    let vp_start = new V_Point();
    /** @type {V_Point}  */
    let vp_end = new V_Point();

    vp_start.X = Number(String($($point_start).css('left')).replace('px', ''));
    vp_start.Y = Number(String($($point_start).css('top')).replace('px', ''));
    $('#Table_level1').find('[data-table-row="start"]').find('[data-table-col="X"]').text(vp_start.X);
    $('#Table_level1').find('[data-table-row="start"]').find('[data-table-col="Y"]').text(vp_start.Y);
    vp_end.X = Number(String($($point_end).css('left')).replace('px', ''));
    vp_end.Y = Number(String($($point_end).css('top')).replace('px', ''));
    $('#Table_level1').find('[data-table-row="end"]').find('[data-table-col="X"]').text(vp_end.X);
    $('#Table_level1').find('[data-table-row="end"]').find('[data-table-col="Y"]').text(vp_end.Y);

    let d_path = "M" + vp_start.X + "," + vp_start.Y + " L" + vp_end.X + "," + vp_end.Y;
    $('#vege_line1').attr('d', d_path);

  }

  function reDraw_point1() {
    /** @type {JQuery}  */
    let $point_start = $('[data-ctlpoint-A="start"]');
    /** @type {JQuery}  */
    let $point_end = $('[data-ctlpoint-A="end"]');
    /** @type {V_Point}  */
    let vp_start = new V_Point();
    /** @type {V_Point}  */
    let vp_end = new V_Point();

    vp_start.X = Number(String($($point_start).css('left')).replace('px', ''));
    vp_start.Y = Number(String($($point_start).css('top')).replace('px', ''));
    vp_end.X = Number(String($($point_end).css('left')).replace('px', ''));
    vp_end.Y = Number(String($($point_end).css('top')).replace('px', ''));

    /** @type {V_Point}  */
    let vp_rtn = getPointZahyo(vp_start, vp_end);
    $('#vege_point1').attr('cx', vp_rtn.X);
    $('#vege_point1').attr('cy', vp_rtn.Y);

  }

  $("[data-ctlpoint-A]").draggable({
    // ドラッグ可能な移動範囲を制限
    containment: '[data-panel="drag_control"]',

    // ドラッグ開始時に実行する処理
    start: function (event, ui) {
    },

    // ドラッグ中に実行する処理
    drag: function (event, ui) {
      reCalucrete_point();
    },

    // ドラッグ終了時に実行する処理
    stop: function (event, ui) {
    }

  });


  /**
   * 1次ベジェ曲線 座標再計算処理
   */
  function reCalucrete_point2() {
    /** @type {JQuery}  */
    let $point_start = $('[data-ctlpoint-B="start"]');
    /** @type {JQuery}  */
    let $point_end = $('[data-ctlpoint-B="end"]');
    /** @type {JQuery}  */
    let $point_first = $('[data-ctlpoint-B="first"]');

    /** @type {V_Point}  */
    let vp_start = new V_Point();
    /** @type {V_Point}  */
    let vp_end = new V_Point();
    /** @type {V_Point}  */
    let vp_first = new V_Point();

    vp_start.X = Number(String($($point_start).css('left')).replace('px', ''));
    vp_start.Y = Number(String($($point_start).css('top')).replace('px', ''));
    $('#Table_level2').find('[data-table-row="start"]').find('[data-table-col="X"]').text(vp_start.X);
    $('#Table_level2').find('[data-table-row="start"]').find('[data-table-col="Y"]').text(vp_start.Y);

    vp_end.X = Number(String($($point_end).css('left')).replace('px', ''));
    vp_end.Y = Number(String($($point_end).css('top')).replace('px', ''));
    $('#Table_level2').find('[data-table-row="end"]').find('[data-table-col="X"]').text(vp_end.X);
    $('#Table_level2').find('[data-table-row="end"]').find('[data-table-col="Y"]').text(vp_end.Y);

    vp_first.X = Number(String($($point_first).css('left')).replace('px', ''));
    vp_first.Y = Number(String($($point_first).css('top')).replace('px', ''));
    $('#Table_level2').find('[data-table-row="first"]').find('[data-table-col="X"]').text(vp_first.X);
    $('#Table_level2').find('[data-table-row="first"]').find('[data-table-col="Y"]').text(vp_first.Y);

    let d_path = "M" + vp_start.X + "," + vp_start.Y + " L" + vp_first.X + "," + vp_first.Y;
    $('#ctrl_first_lineA').attr('d', d_path);

    d_path = "M" + vp_first.X + "," + vp_first.Y + " L" + vp_end.X + "," + vp_end.Y;
    $('#ctrl_first_lineB').attr('d', d_path);
    // ベジェ曲線を更新する
    d_path = "M" + vp_start.X + "," + vp_start.Y + " Q" + vp_first.X + "," + vp_first.Y + " " + vp_end.X + "," + vp_end.Y;
    $('#vege_line2').attr('d', d_path);

  }

  function reDraw_point2() {
    /** @type {JQuery}  */
    let $point_start = $('[data-ctlpoint-B="start"]');
    /** @type {JQuery}  */
    let $point_end = $('[data-ctlpoint-B="end"]');
    /** @type {JQuery}  */
    let $point_first = $('[data-ctlpoint-B="first"]');

    /** @type {V_Point}  */
    let vp_start = new V_Point();
    /** @type {V_Point}  */
    let vp_end = new V_Point();
    /** @type {V_Point}  */
    let vp_first = new V_Point();

    vp_start.X = Number(String($($point_start).css('left')).replace('px', ''));
    vp_start.Y = Number(String($($point_start).css('top')).replace('px', ''));
    vp_end.X = Number(String($($point_end).css('left')).replace('px', ''));
    vp_end.Y = Number(String($($point_end).css('top')).replace('px', ''));
    vp_first.X = Number(String($($point_first).css('left')).replace('px', ''));
    vp_first.Y = Number(String($($point_first).css('top')).replace('px', ''));

    /** @type {V_Point}  */
    let vp_CulA = getPointZahyo(vp_start, vp_first);
    $('#ctrl_first_pointA').attr('cx', vp_CulA.X);
    $('#ctrl_first_pointA').attr('cy', vp_CulA.Y);
    let vp_CulB = getPointZahyo(vp_first, vp_end);
    $('#ctrl_first_pointB').attr('cx', vp_CulB.X);
    $('#ctrl_first_pointB').attr('cy', vp_CulB.Y);

    let d_path = "M" + vp_CulA.X + "," + vp_CulA.Y + " L" + vp_CulB.X + "," + vp_CulB.Y;
    $('#ctrl_first_lineC').attr('d', d_path);
    let vp_CulC = getPointZahyo(vp_CulA, vp_CulB);
    $('#vege_point2').attr('cx', vp_CulC.X);
    $('#vege_point2').attr('cy', vp_CulC.Y);


  }

  $("[data-ctlpoint-B]").draggable({
    // ドラッグ可能な移動範囲を制限
    containment: '[data-panel="drag_control2"]',

    // ドラッグ開始時に実行する処理
    start: function (event, ui) {
    },

    // ドラッグ中に実行する処理
    drag: function (event, ui) {
      reCalucrete_point2();
    },

    // ドラッグ終了時に実行する処理
    stop: function (event, ui) {
    }

  });


  reCalucrete_point();
  reCalucrete_point2();
  let timer = window.requestAnimationFrame(moveAnimetion);

}); 