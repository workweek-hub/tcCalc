<template>
  <div class="modal-wrapper">
    <div class="modal-form" id="webform-ajax-wrapper-71">
      <form
        v-if="form"
        class="form-input webform-client-form webform-client-form-71 antibot"
        onsubmit="ym(21745153, 'reachGoal', 'zakaz_krana'); return true;"
        action="/colorbox/node/71?tonn=25"
        method="post"
        id="webform-client-form-71"
        accept-charset="UTF-8"
      >
        <h3>Заполните форму</h3>
        <p>и мы свяжемся с Вами в течение 5 минут!</p>
        <select
          id="edit-submitted-kran"
          name="submitted[kran]"
          class="form-select"
        >
          <option :selected="opt === weight" v-for="opt of options" :key="opt">
            {{ opt }} тонн
          </option>
        </select>
        <input
          required="required"
          placeholder="Ваш телефон *"
          type="text"
          :value="phone"
          id="edit-submitted-phone--2"
          name="submitted[phone]"
          size="20"
          maxlength="128"
          class="form-text required"
          spellcheck="false"
          data-ms-editor="true"
        />
        <textarea
          placeholder="Адрес электронной почты или сообщение"
          name="submitted[message]"
          cols="60"
          rows="4"
          class="form-textarea"
          spellcheck="false"
          data-ms-editor="true"
          id="edit-submitted-message"
        ></textarea>
        <input type="hidden" name="details[sid]" />
        <input type="hidden" name="details[page_num]" value="1" />
        <input type="hidden" name="details[page_count]" value="1" />
        <input type="hidden" name="details[finished]" value="0" />
        <input
          type="hidden"
          name="form_build_id"
          value="form-eadHKSJ6KY9dn5QRiXKsF9PeIGOVF9YfmU5hn7kXid4"
        />
        <input type="hidden" name="form_id" value="webform_client_form_71" />
        <input
          type="hidden"
          name="antibot_key"
          value="b4a538cc4678cdc9e3b4ed2c67c9b50f"
        />
        <div class="user-data">
          <input
            required="required"
            type="checkbox"
            id="edit-fz152-agreement--2"
            name="fz152_agreement"
            value="1"
            checked="checked"
            class="form-checkbox required"
          />
          <span>Я даю согласие на <br />
            <a href="https://bifgroup.ru/privacy-policy">
              обработку моих данных
            </a>. <span>*</span>
          </span>
        </div>
        <input
          type="hidden"
          name="webform_ajax_wrapper_id"
          value="webform-ajax-wrapper-71"
        />
        <div class="form-actions">
          <input
            class="
              submit-btn
              webform-submit
              button-primary
              form-submit
              ajax-processed
            "
            type="submit"
            id="edit-submit--2"
            name="op"
            value="Арендовать"
            @click="submitForm()"
          />
        </div>
      </form>
      <div v-if="!form" class="submitted">
        <p>Заявка принята</p>
        <button @click="form = !form">Вернуться к форме</button>
      </div>
    </div>
    <div class="modal-background" @click="$emit('closeModal')"></div>
  </div>
</template>

<script>
export default {
  name: "RentForm",
  props: {
    weight: {
      type: Number,
      required: true,
    },
  },
  emits: {
    closeModal: null,
  },
  data() {
    return {
      form: true,
      options: [
        25, 32, 40, 45, 50, 60, 70, 80, 90, 100, 130, 160, 200, 220, 250, 300,
        350, 500,
      ],
      phone: "",
    };
  },
  created() {},
  methods: {
    submitForm() {
      this.form = false;
    },
  },
};
</script>

<style lang="scss">
.modal-background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.65;
  z-index: 1000;
}
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}

.modal-form {
  max-width: 360px;
  width: 100%;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -205px;
  padding: 20px;
  z-index: 10000;
  .form-input {
    display: grid;
    > h3 {
      font-size: 30px;
      line-height: 30px;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      margin: 0;
    }

    > p {
      margin: 5px 0 20px;
      font-size: 15px;
      text-align: center;
      color: #666;
    }

    > select {
      background: #fff;
      padding: 7px 6px;
      font: 15px/18px "Roboto", Arial, Helvetica, sans-serif;
      max-height: 34px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #aaa;
      margin-bottom: 14px;
    }

    > input {
      background: #fff;
      padding: 7px 6px;
      font: 15px/18px "Roboto", Arial, Helvetica, sans-serif;
      max-height: 34px;
      box-sizing: border-box;
      border: 1px solid #aaa;
      margin-bottom: 14px;
    }

    > textarea {
      background: #fff;
      padding: 8px 12px;
      font: 15px/16px "Roboto", Arial, Helvetica, sans-serif;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #aaa;
      margin-bottom: 14px;
    }

    .user-data {
      margin-bottom: 14px;
      display: flex;

      > span {
        font-size: 13px;
        margin-left: 10px;

        > a {
          color: #d22129;

          &:hover {
            text-decoration: none;
          }
        }

        > span {
          color: #d22129;
        }
      }
    }
  }
  .submitted {
    display: grid;
    font: 14px/20px "Roboto", Arial, Helvetica, sans-serif;
    color: #222;
    margin: 0;
    padding: 0;
    > p {
      margin: 0;
      padding: 0;
    }
    > button {
      background: none;
      border: none;
      color: #d22129;
      width: max-content;
      padding: 0;
      margin-top: 10px;
      cursor: pointer;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
.submit-btn {
  border: none;
  border-radius: 30px;
  background: #e10b14;
  font-size: 16px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  max-width: 130px;

  &:hover {
    background: #8d080e;
  }
}
@media screen and (max-width: 400px) {
  .modal-form {
    left: 0;
    margin-right: 10px;
    margin-left: 10px;
    max-width: calc(100% - 60px);
  }
}
</style>
