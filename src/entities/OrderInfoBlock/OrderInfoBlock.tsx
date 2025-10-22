"use client";
import { showCountMessage } from "@/shared/ui";
import Link from "next/link";
import s from "./OrderInfoBlock.module.scss";

const OrderInfoBlock = ({
  cartData,
  isOrderPage,
  bonusType,
  bonus,
  promocode,
  deliveryPrice,
}: {
  cartData: any;
  isOrderPage: any;
  bonusType?: any;
  bonus?: any;
  promocode?: any;
  deliveryPrice?: number;
}) => {
  let itemsQuantity = getItemsQuantity(cartData);
  let purePriceTotal = getItemsPurePrice(cartData);
  let itemsTotalPrice = getItemsTOtalPrice(
    isOrderPage,
    cartData,
    bonus,
    promocode,
    deliveryPrice,
  );

  return (
    <div className={s.Container}>
      <div className={s.Inner}>
        <p className={s.Info}>
          {itemsQuantity} {showCountMessage(`${itemsQuantity}`)} на сумму
          <span className={s.InfoText}>{purePriceTotal} ₽</span>
        </p>
        {isOrderPage && (
          <>
            <p className={s.Info}>
              <span className={s.InfoText}>
                Программа лояльности: {bonusType}
              </span>
              {bonus > 0 ? (
                <span className={s.InfoText}>Списано бонусов: {bonus}</span>
              ) : (
                <></>
              )}
              {promocode.discount > 0 ? (
                <span className={s.InfoText}>Промокод: Активирован</span>
              ) : (
                <></>
              )}
              {deliveryPrice && deliveryPrice > 0 ? (
                <span className={s.InfoText}>Доставка: {deliveryPrice} ₽</span>
              ) : (
                <></>
              )}
            </p>
          </>
        )}
        <p className={s.Total}>
          <span>Итого: </span>
          <span className={s.Price}>{itemsTotalPrice} ₽</span>
        </p>
        {isOrderPage ? (
          <button
            className={` ${s.Button}`}
            type="submit"
            // disabled={
            //   !isUserAgree || !currentCartByAuth.length || paymentSpinner
            // }
            // onClick={handleMakePayment}
          >
            Оформить заказ
          </button>
        ) : (
          <Link
            href="/"
            className={s.Button}
            // ${
            // !isUserAgree || !currentCartByAuth.length ? styles.disabled : ''
          >
            Оформить заказ
          </Link>
        )}
        <label className={s.Agreement}>
          <input
            className={s.AgreementInput}
            type="checkbox"
            tabIndex={-1}
            defaultChecked
            // ref={checkboxRef}
            // onChange={handleAgreementChange}
            // checked={isUserAgree}
          />
          <span className={s.Agreement__Mark} />
          <span
            className={s.AgreementCheckbox}
            tabIndex={0}
            // onKeyDown={handleTabCheckbox}
          />
          <span className={s.AgreementText}>
            Нажимая на кнопку «Оформить заказ», вы даете согласие на обработку
            <Link href="/privacy" className={s.AgreementLink}>
              {" "}
              персональных данных
            </Link>
          </span>
        </label>
      </div>
    </div>
  );
};

export default OrderInfoBlock;

function getItemsQuantity(arr: any[]) {
  let quantity = 0;
  arr.forEach((item) => {
    quantity += +item.quantity;
  });
  return quantity;
}

export function getItemsPurePrice(arr: any[]) {
  let price = 0;
  arr.forEach((item) => {
    price += +item.price * +item.quantity;
  });
  return price;
}

function getItemsTOtalPrice(
  isOrderPage: boolean,
  arr: any[],
  bonus: any = 0,
  promocode?: any,
  deliveryPrice?: number,
) {
  let price = 0;
  arr.forEach((item) => {
    price += +item.price * +item.quantity;
  });
  if (isOrderPage) {
    let total = price - bonus;
    if (promocode.discount > 0) {
      total = total - promocode.discount;
    }
    if (deliveryPrice) {
      total += deliveryPrice;
    }
    return total;
  }
  return price;
}
